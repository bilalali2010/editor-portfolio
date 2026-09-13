export interface EditorConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  /** WhatsApp phone number with country code, digits only, e.g. "1234567890" */
  whatsappNumber: string;
  /** Default message opened in WhatsApp chat */
  whatsappDefaultMessage: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  availabilityStatus: string;
  turnaroundEstimate: string;
}

export const EDITOR_CONFIG: EditorConfig = {
  name: 'Bilal Ali',
  role: 'Video Editor & Visual Storyteller',
  tagline: 'I turn raw footage into attention.',
  email: 'bilalali092010@gmail.com',
  // Update with your actual WhatsApp number (country code + number with no symbols):
  whatsappNumber: '1234567890',
  whatsappDefaultMessage: 'Hi Bilal, I watched your video editor portfolio and would like to discuss an edit project.',
  instagram: 'https://instagram.com/bilalali.edits',
  youtube: 'https://youtube.com/@bilalaliedits',
  tiktok: 'https://tiktok.com/@bilaledits',
  linkedin: 'https://linkedin.com/in/bilalali',
  availabilityStatus: 'AVAILABLE FOR Q2/Q3 PROJECTS',
  turnaroundEstimate: '24–48 Hours',
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const msg = encodeURIComponent(customMessage || EDITOR_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${EDITOR_CONFIG.whatsappNumber}?text=${msg}`;
};
