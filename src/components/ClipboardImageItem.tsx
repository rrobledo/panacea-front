import React, { useEffect, useState } from "react";
import { message, Image, Button } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

type ClipboardImageItemProps = {
  value?: any;
  onChange?: (value: Blob | File | null) => void;
};

const ClipboardImageItem: React.FC<ClipboardImageItemProps> = ({
  value,
  onChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice, (char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays);
  }

  useEffect(() => {
    if (value != null && typeof value === "string") {
      const file = base64ToBlob(value);
      setPreviewUrl(URL.createObjectURL(file));
      onChange?.(file);
    }

    const handlePaste = (event: Event) => {
      const clipboardEvent = event as ClipboardEvent;
      const items = clipboardEvent.clipboardData?.items;
      if (!items) return;

      Array.from(items).forEach((item) => {
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            console.log(file);
            onChange?.(file);
            message.success("Image pasted from clipboard!");
          }
        }
      });
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onChange]);

  const clearImage = () => {
    setPreviewUrl(null);
    onChange?.(null);
  };

  return (
    <div
      style={{
        border: "1px dashed #ccc",
        padding: 16,
        textAlign: "center",
        borderRadius: 8,
        backgroundColor: "#fafafa",
      }}
    >
      <p>
        <CopyOutlined /> Paste an image with <strong>Ctrl+V</strong> or{" "}
        <strong>Cmd+V</strong>
      </p>
      {previewUrl ? (
        <>
          <Image src={previewUrl} alt="Clipboard Preview" width={200} />
          <div style={{ marginTop: 10 }}>
            <Button danger icon={<DeleteOutlined />} onClick={clearImage}>
              Remove
            </Button>
          </div>
        </>
      ) : (
        <p>No image pasted yet</p>
      )}
    </div>
  );
};

export default ClipboardImageItem;
