import Session from "../models/Session.js";

export const getPublishedSessions = async (req, res) => {
  try {
    const sessions = await Session.find({}).lean();
    return res.status(200).json({ sessions });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({ user_id: userId })
      .sort({ updated_at: -1 })
      .lean();
    return res.status(200).json({ sessions });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMySessionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const session = await Session.findById(id).lean();
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.user_id.toString() !== userId)
      return res.status(403).json({ message: "Forbidden" });
    return res.status(200).json({ session });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const saveDraft = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, title, tags, json_file_url } = req.body;

    if (!title || !json_file_url) {
      return res
        .status(400)
        .json({ message: "title and json_file_url are required" });
    }

    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    if (id) {
      const session = await Session.findById(id);
      if (!session)
        return res.status(404).json({ message: "Session not found" });
      if (session.user_id.toString() !== userId)
        return res.status(403).json({ message: "Forbidden" });

      session.title = title;
      session.tags = normalizedTags;
      session.json_file_url = json_file_url;
      session.status = session.status || "draft";
      await session.save();
      return res.status(200).json({ message: "Draft updated", session });
    } else {
      const newSession = await Session.create({
        user_id: userId,
        title,
        tags: normalizedTags,
        json_file_url,
        status: "draft",
      });
      return res
        .status(201)
        .json({ message: "Draft saved", session: newSession });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const publishSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, title, tags, json_file_url } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required to publish" });
    }

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.user_id.toString() !== userId)
      return res.status(403).json({ message: "Forbidden" });

    if (title) session.title = title;
    if (json_file_url) session.json_file_url = json_file_url;
    if (tags) {
      const normalizedTags = Array.isArray(tags)
        ? tags.map((t) => t.trim()).filter(Boolean)
        : typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      session.tags = normalizedTags;
    }

    session.status = "published";
    await session.save();
    return res.status(200).json({ message: "Session published", session });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
