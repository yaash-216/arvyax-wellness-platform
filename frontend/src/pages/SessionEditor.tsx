import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMySessionById, saveDraft, publishSession } from "../api/sessionApi";
import { useAutoSave } from "../hooks/useAutoSave";
import Heading from "../components/Heading";
import type { FormEditorInterface } from "../types";

const SessionEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormEditorInterface>({
    id: null,
    title: "",
    tags: "",
    json_file_url: "",
  });

  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const showAlert = (
    msg: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setAlertMsg(msg);
    setAlertType(type);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  const fecthGetMySessionById = async () => {
    try {
      if (!id) return;
      const res = await getMySessionById(id);
      const s = res.data.session;
      setForm({
        id: s._id,
        title: s.title || "",
        tags: (s.tags || []).join(","),
        json_file_url: s.json_file_url || "",
      });
    } catch (err) {
      console.info(err);
    }
  };

  useEffect(() => {
    fecthGetMySessionById();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const doSaveDraft = async (currentForm: FormEditorInterface) => {
    const payload: any = {
      id: currentForm.id,
      title: currentForm.title,
      tags: currentForm.tags,
      json_file_url: currentForm.json_file_url,
    };
    const res = await saveDraft(payload);
    if (!currentForm.id && res.data.session?._id) {
      setForm((p) => ({ ...p, id: res.data.session._id }));
      navigate(`/editor/${res.data.session._id}`, { replace: true });
    }
    return res.data;
  };

  const { status, manualSave } = useAutoSave<FormEditorInterface>({
    value: form,
    onSave: doSaveDraft,
    delay: 5000,
  });

  const handleManualSave = async () => {
    try {
      await manualSave();
      showAlert("Saved successfully!", "success");
    } catch {
      showAlert("Save failed!", "error");
    }
  };

  const handlePublish = async () => {
    try {
      await manualSave();
      if (!form.id) {
        showAlert(
          "No draft ID yet — wait for auto-save or click Save once.",
          "warning"
        );
        return;
      }
      const payload: any = {
        id: form.id,
        title: form.title,
        tags: form.tags,
        json_file_url: form.json_file_url,
      };
      await publishSession(payload);
      navigate("/my-sessions");
    } catch (err: any) {
      showAlert(err?.response?.data?.message || "Publish failed!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {alertMsg && (
        <div
          className={`alert ${
            alertType === "success"
              ? "alert-success"
              : alertType === "error"
              ? "alert-error"
              : "alert-warning"
          } shadow-lg mb-4`}
        >
          <span>{alertMsg}</span>
        </div>
      )}

      <Heading text="Session Editor" />
      <div className="card p-6">
        <label className="label">Title</label>
        <input
          value={form.title}
          name="title"
          onChange={handleChange}
          className="input mb-3"
          placeholder="Enter your title"
        />
        <label className="label">Tags (comma separated)</label>
        <input
          value={form.tags}
          name="tags"
          onChange={handleChange}
          className="input mb-3"
          placeholder="Enter your tags"
        />

        <label className="label">JSON File URL</label>
        <input
          value={form.json_file_url}
          name="json_file_url"
          onChange={handleChange}
          className="input mb-3"
          placeholder="Enter your json file url"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div>
          {status === "saving" && (
            <p className="text-sm text-yellow-600">Saving…</p>
          )}
          {status === "saved" && (
            <p className="text-sm text-green-600">Saved</p>
          )}
          {status === "error" && (
            <p className="text-sm text-center text-red-600">Error</p>
          )}
        </div>
        <div className="flex justify-center gap-3">
          <button className="btn w-1/3" onClick={handleManualSave}>
            Save now
          </button>
          <button className="btn w-1/3 btn-primary" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;
