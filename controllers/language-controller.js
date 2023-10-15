const knex = require("knex")(require("../knexfile"));

// Fetch all languages
const getAllLanguages = async (req, res) => {
    try {
        const languages = await knex('Languages');
        res.status(200).json(languages);
    } catch (error) {
        console.error("Error fetching all languages:", error);
        res.status(500).json({ error: "Failed to fetch all languages" });
    }
};

// Fetch a specific language by its ISO code
const getLanguageByISOCode = async (req, res) => {
    const { iso_code } = req.params;

    try {
        const language = await knex('Languages').where({ iso_code }).first();

        if (!language) {
            res.status(404).json({ message: `Language with ISO code ${iso_code} not found` });
        } else {
            res.status(200).json(language);
        }
    } catch (error) {
        console.error(`Error fetching language with ISO code ${iso_code}:`, error);
        res.status(500).json({ error: `Failed to fetch language with ISO code ${iso_code}` });
    }
};

module.exports = {
    getAllLanguages,
    getLanguageByISOCode
};