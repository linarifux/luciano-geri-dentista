const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'clinicHours'
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('Settings', SettingsSchema);