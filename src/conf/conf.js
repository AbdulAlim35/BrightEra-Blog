const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_DATABASE_ID),
  collactionId: String(import.meta.env.VITE_COLLACTION_ID),
  profileCollactionId: String(import.meta.env.VITE_PROFILE_COLLACTION_ID),
  commentCollactionId: String(import.meta.env.VITE_COMMENT_COLLACTION_ID),
  abconCollactionId: String(import.meta.env.VITE_ABCON_COLLACTION_ID),
  contactCollactionId: String(import.meta.env.VITE_CONTACT_COLLACTION_ID),
  getintouchCollactionId: String(import.meta.env.VITE_GETINTOUCH_COLLACTION_ID),
  heroCollactionId: String(import.meta.env.VITE_HERO_COLLACTION_ID),
  settingCollactionId: String(import.meta.env.VITE_SETTING_COLLACTION_ID),
  iconeCollactionId: String(import.meta.env.VITE_ICONE_COLLACTION_ID),
  bucketId: String(import.meta.env.VITE_BUCKET_ID),
};

export default conf;
