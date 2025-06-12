import React, { useState } from "react";
import InputFlexOnImage from "../../components/InputFlexOnImage";
import LexicalEditor from "../../components/LexicalEditor";
import { useDispatch } from "react-redux";
import { setQuestionData } from "../../redux/questionSlice";
import ReturnButton from "../../components/ButtonNavigate/ReturnButton";


const DragDropImage = () => {
    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null);
    const [insertMode, setInsertMode] = useState(false);
    const [question, setQuestion] = useState(null);
    const [inputs, setInputs] = useState([]);
    const [countInput, setCountInput] = useState(1);
    const [audioUrl, setAudioUrl] = useState(null);


    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const getQuestionFromLexical = () => {
        console.log("==== INPUTS ====", inputs);
        console.log("==== QUESTION JSON ====", question);
    }

    const handleImageClick = (e) => {
        if (!insertMode) return;

        const imgRect = e.target.getBoundingClientRect();
        const x = (e.clientX - imgRect.left) / imgRect.width;
        const y = (e.clientY - imgRect.top) / imgRect.height;

        const newKey = countInput;

        setInputs(prev => [...prev, {
            key: newKey,
            value: '',
            x,
            y,
        }]);
        setCountInput(prev => prev + 1);
        console.log(inputs);
        setInsertMode(false); // Tắt chế độ insert sau khi thêm
    };

    const handleSubmit = () => {
        console.log("==== INPUTS BLANK ====", inputs);
        console.log("==== QUESTION JSON ====", question);
        console.log("==== AUDIO URL ====", audioUrl);
        console.log("==== IMAGE ====", preview);
        const payload = {
            question,
            inputs,
            audioUrl,
            preview,
        };
        dispatch(setQuestionData(payload));
        console.log("==== Saved to Redux ====", payload);
    }

    return (
        <div style={{ padding: "20px" }}>
            <ReturnButton />
            <h1>Upload question and mix image</h1>
            <div>
                <h3>Type your question...</h3>
                <LexicalEditor onUpdate={(json) => setQuestion(json)} />
                <button className="button-secondary" onClick={getQuestionFromLexical}>Submit</button>
            </div>
            <br />
            {/* Upload file am thanh */}
            <label className="button" htmlFor="upload-audio" style={{ cursor: 'pointer', display: 'inline-block', marginRight: 10 }}>
                Upload record test
            </label>
            <input
                id="upload-audio"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        console.log("Uploaded audio file:", file);
                        // Nếu cần lưu vào state hoặc play thử
                        const audioUrl = URL.createObjectURL(file);
                        setAudioUrl(audioUrl) // Hoặc  để hiển thị trình phát
                    }
                }}
                style={{ display: "none" }}
            />
            {
                audioUrl !== null && <audio controls src={audioUrl} />
            }
            <br />
            {/* Nút upload */}
            <label className="button" htmlFor="upload-image" style={{ cursor: 'pointer', display: 'inline-block', marginBottom: 10, marginTop: 10 }}>
                Upload Image
            </label>
            <input
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
            />
            <br />
            <button className="button" onClick={() => setInsertMode(true)}>
                Insert blank input
            </button>

            <br />

            {/* Hiển thị ảnh preview */}
            {preview && (
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        marginTop: 10,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        cursor: insertMode ? "crosshair" : "default",
                    }}
                    onClick={handleImageClick}
                >
                    <img
                        src={preview}
                        alt="preview"
                        style={{
                            display: 'block',
                            maxWidth: '100%',
                            pointerEvents: "none",
                        }}
                    />
                    {insertMode && (
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            backgroundColor: 'rgba(255, 215, 0, 0.9)',
                            color: '#000',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                            zIndex: 10
                        }}>
                            Insert Mode: Click to place input
                        </div>
                    )}
                    {inputs.map((item, idx) => (
                        <InputFlexOnImage
                            id={item.key}
                            x={item.x}
                            y={item.y}
                            value={item.value}
                            onChange={(e) => {
                                console.log(e)
                                const newInputs = [...inputs];
                                newInputs[idx].value = e;
                                setInputs(newInputs);
                            }}
                            onDelete={() => {
                                setInputs((prev) => prev.filter((_, i) => i !== idx));
                            }}
                        />
                    ))}
                </div>
            )}
            <br />
            {
                (preview !== null) &&
                <button className="button" onClick={handleSubmit}>Submit</button>
            }
        </div>
    );
};

export default DragDropImage;
