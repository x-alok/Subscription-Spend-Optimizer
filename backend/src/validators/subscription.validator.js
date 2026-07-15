const { body } = require('express-validator');

const createSubscriptionValidator = [
  body('serviceName')
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters')
    .trim(),

  body('provider')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Provider name cannot exceed 100 characters')
    .trim(),

  body('category')
    .optional()
    .isIn(['Entertainment', 'Productivity', 'Education', 'Cloud', 'Development', 'Storage', 'Finance', 'Security', 'Utilities', 'Other'])
    .withMessage('Invalid category'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code')
    .isUppercase()
    .withMessage('Currency must be in uppercase')
    .matches(/^[A-Z]{3}$/)
    .withMessage('Invalid currency code'),

  body('billingCycle')
    .notEmpty()
    .withMessage('Billing cycle is required')
    .isIn(['Monthly', 'Quarterly', 'Yearly'])
    .withMessage('Billing cycle must be Monthly, Quarterly, or Yearly'),

  body('renewalDate')
    .notEmpty()
    .withMessage('Renewal date is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      if (date < today) {
        throw new Error('Renewal date cannot be in the past');
      }
      return true;
    }),

  body('lastUsedDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),

  body('status')
    .optional()
    .isIn(['Active', 'Expired', 'Cancelled', 'Paused'])
    .withMessage('Invalid status'),

  body('autoRenew')
    .optional()
    .isBoolean()
    .withMessage('autoRenew must be a boolean'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim()
];

const updateSubscriptionValidator = [
  body('serviceName')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters')
    .trim(),

  body('provider')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Provider name cannot exceed 100 characters')
    .trim(),

  body('category')
    .optional()
    .isIn(['Entertainment', 'Productivity', 'Education', 'Cloud', 'Development', 'Storage', 'Finance', 'Security', 'Utilities', 'Other'])
    .withMessage('Invalid category'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code')
    .isUppercase()
    .withMessage('Currency must be in uppercase')
    .matches(/^[A-Z]{3}$/)
    .withMessage('Invalid currency code'),

  body('billingCycle')
    .optional()
    .isIn(['Monthly', 'Quarterly', 'Yearly'])
    .withMessage('Billing cycle must be Monthly, Quarterly, or Yearly'),

  body('renewalDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),

  body('lastUsedDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),

  body('status')
    .optional()
    .isIn(['Active', 'Expired', 'Cancelled', 'Paused'])
    .withMessage('Invalid status'),

  body('autoRenew')
    .optional()
    .isBoolean()
    .withMessage('autoRenew must be a boolean'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim()
];

module.exports = {
  createSubscriptionValidator,
  updateSubscriptionValidator
};