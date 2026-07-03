const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const contentService = require('./content.service');

/**
 * GET /api/content/quiz-questions
 * Returns quiz questions without correct answers (for client-side rendering).
 * Correct answers are validated server-side on submission.
 */
router.get(
  '/quiz-questions',
  asyncHandler(async (req, res) => {
    const questions = await contentService.getItems('quiz-question');
    const clientQuestions = questions.map(({ id, topic, question, options }) => ({
      id,
      topic,
      question,
      options,
    }));

    res.status(200).json({
      success: true,
      data: { questions: clientQuestions },
    });
  })
);

/**
 * GET /api/content/phishing-emails
 * Returns phishing email data for the phishing room.
 * Does NOT include the type (phishing/legitimate) — that's what users must determine.
 */
router.get(
  '/phishing-emails',
  asyncHandler(async (req, res) => {
    const emails = await contentService.getItems('phishing-email');
    const clientEmails = emails.map(
      ({ id, senderName, senderEmail, subject, timestamp, body, links, hint, difficulty }) => ({
        id,
        senderName,
        senderEmail,
        subject,
        timestamp,
        body,
        links,
        hint,
        difficulty,
      })
    );

    res.status(200).json({
      success: true,
      data: { emails: clientEmails },
    });
  })
);

/**
 * POST /api/content/phishing-emails/check
 * Check a user's answer for a specific email.
 */
router.post(
  '/phishing-emails/check',
  asyncHandler(async (req, res) => {
    const { emailId, answer } = req.body; // answer: 'safe' or 'suspicious'

    const email = await contentService.getItem('phishing-email', emailId);
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found.' });
    }

    const isCorrect =
      (answer === 'suspicious' && email.type === 'phishing') ||
      (answer === 'safe' && email.type === 'legitimate');

    res.status(200).json({
      success: true,
      data: {
        correct: isCorrect,
        emailType: email.type,
        redFlags: email.redFlags || [],
        legitimateIndicators: email.legitimateIndicators || [],
        lesson: email.lesson,
        externalLink: email.externalLink,
      },
    });
  })
);

/**
 * GET /api/content/password-challenges
 * Returns password challenge data.
 */
router.get(
  '/password-challenges',
  asyncHandler(async (req, res) => {
    const challenges = await contentService.getItems('password-challenge');
    res.status(200).json({
      success: true,
      data: { challenges },
    });
  })
);

/**
 * GET /api/content/social-engineering
 * Returns social engineering scenario data without correct answers.
 */
router.get(
  '/social-engineering',
  asyncHandler(async (req, res) => {
    const scenarios = await contentService.getItems('social-scenario');
    const clientScenarios = scenarios.map(
      ({ id, type, title, difficulty, setup, messages, followUp, decisionPrompt, options, hint }) => ({
        id,
        type,
        title,
        difficulty,
        setup,
        messages,
        followUp,
        decisionPrompt,
        options: options.map(({ id: optionId, text }) => ({ id: optionId, text })), // Strip consequences and correctness
        hint,
      })
    );

    res.status(200).json({
      success: true,
      data: { scenarios: clientScenarios },
    });
  })
);

/**
 * POST /api/content/social-engineering/check
 * Check a user's answer for a specific scenario.
 */
router.post(
  '/social-engineering/check',
  asyncHandler(async (req, res) => {
    const { scenarioId, answerId } = req.body;

    const scenario = await contentService.getItem('social-scenario', scenarioId);
    if (!scenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found.' });
    }

    const selectedOption = scenario.options.find((o) => o.id === answerId);
    if (!selectedOption) {
      return res.status(400).json({ success: false, message: 'Invalid answer option.' });
    }

    res.status(200).json({
      success: true,
      data: {
        correct: selectedOption.isCorrect,
        consequence: selectedOption.consequence,
        lesson: selectedOption.lesson,
        externalLink: selectedOption.externalLink,
        redFlags: scenario.redFlags,
      },
    });
  })
);

module.exports = router;
