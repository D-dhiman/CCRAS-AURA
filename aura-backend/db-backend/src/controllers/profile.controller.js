import pool from "../db/index.js";

// Fetch the logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `SELECT * FROM profile WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Create or update profile (upsert)
export const upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, age, gender, city, lifestyle, vata_score, pitta_score, kapha_score } = req.body;

    let dominant_dosha;
    if (vata_score !== undefined && pitta_score !== undefined && kapha_score !== undefined) {
      const scores = { vata: vata_score, pitta: pitta_score, kapha: kapha_score };
      dominant_dosha = Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
    }

    const query = `
      INSERT INTO profile
        (user_id, name, age, gender, city, lifestyle, vata_score, pitta_score, kapha_score, dominant_dosha)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (user_id)
      DO UPDATE SET
        name = COALESCE(EXCLUDED.name, profile.name),
        age = COALESCE(EXCLUDED.age, profile.age),
        gender = COALESCE(EXCLUDED.gender, profile.gender),
        city = COALESCE(EXCLUDED.city, profile.city),
        lifestyle = COALESCE(EXCLUDED.lifestyle, profile.lifestyle),
        vata_score = COALESCE(EXCLUDED.vata_score, profile.vata_score),
        pitta_score = COALESCE(EXCLUDED.pitta_score, profile.pitta_score),
        kapha_score = COALESCE(EXCLUDED.kapha_score, profile.kapha_score),
        dominant_dosha = COALESCE(EXCLUDED.dominant_dosha, profile.dominant_dosha),
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const values = [userId, name, age, gender, city, lifestyle, vata_score, pitta_score, kapha_score, dominant_dosha];
    const result = await pool.query(query, values);

    res.status(200).json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save profile" });
  }
};
