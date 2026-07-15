const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    minlength: [2, 'Service name must be at least 2 characters'],
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  provider: {
    type: String,
    trim: true,
    maxlength: [100, 'Provider name cannot exceed 100 characters'],
    default: ''
  },
  category: {
    type: String,
    enum: ['Entertainment', 'Productivity', 'Education', 'Cloud', 'Development', 'Storage', 'Finance', 'Security', 'Utilities', 'Other'],
    default: 'Other'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    uppercase: true,
    default: 'USD',
    match: [/^[A-Z]{3}$/, 'Please provide a valid 3-letter currency code']
  },
  billingCycle: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Yearly'],
    required: [true, 'Billing cycle is required']
  },
  renewalDate: {
    type: Date,
    required: [true, 'Renewal date is required']
  },
  lastUsedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Cancelled', 'Paused'],
    default: 'Active'
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
subscriptionSchema.index({ userId: 1, serviceName: 1 });
subscriptionSchema.index({ userId: 1, category: 1 });
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ userId: 1, renewalDate: 1 });

// Middleware to update status based on renewal date
subscriptionSchema.pre('save', function(next) {
  if (this.renewalDate) {
    const today = new Date();
    const renewalDate = new Date(this.renewalDate);
    
    // If renewal date is in the past and status is not Cancelled or Paused
    if (renewalDate < today && this.status !== 'Cancelled' && this.status !== 'Paused') {
      this.status = 'Expired';
    }
  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;