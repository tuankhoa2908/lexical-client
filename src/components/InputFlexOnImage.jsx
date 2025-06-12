import React, { useState } from "react";

const InputFlexOnImage = ({
    id,
    x,
    y,
    value,
    onChange,
    onDelete,
    canEdit = true,
    isCorrect = null,
}) => {
    const [hovered, setHovered] = useState(false);

    const handleChange = (e) => {
        if (canEdit) {
            onChange(e.target.value, id);
        }
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedText = e.dataTransfer.getData("text/plain");
        if (droppedText) {
            onChange(droppedText, id);
        }
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", value);
        // gắn id để biết thằng nào đang drag
        e.dataTransfer.setData("sourceId", id);
    };

    const handleDragEnd = (e) => {
        const dropEffect = e.dataTransfer.dropEffect;
        const target = e.relatedTarget;
        // Nếu không drop vào đâu thì xóa
        if (dropEffect === "none") {
            onChange("", id);
        }
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            style={{
                position: "absolute",
                top: `${y * 100}%`,
                left: `${x * 100}%`,
                transform: "translate(-50%, -50%)",
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "2px 6px",
                zIndex: 10,
            }}
        >
            <input
                value={value}
                onChange={handleChange}
                readOnly={!canEdit}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{
                    fontSize: "14px",
                    padding: "4px 8px",
                    border: "1px solid #aaa",
                    borderRadius: "4px",
                    outline: "none",
                    minWidth: "50px",
                    width: `${Math.max(value.length * 8, 50)}px`,
                    transition: "width 0.2s ease-in-out",
                    background: canEdit ? "white" : "#f0f0f0",
                    cursor: canEdit ? "text" : "grab",
                }}
            />
            {isCorrect !== null && (
                <span
                    style={{
                        marginLeft: 6,
                        color: isCorrect ? 'green' : 'red',
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }}
                >
                    {isCorrect ? '✓' : '✗'}
                </span>
            )}
            {hovered && canEdit && (
                <button
                    onClick={handleDelete}
                    title="Xóa"
                    style={{
                        marginLeft: "6px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#d00",
                        fontSize: "16px",
                        lineHeight: "1",
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default InputFlexOnImage;
