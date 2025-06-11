import { DecoratorNode } from "lexical";
import * as React from "react";

function FillBlankComponent({ nodeKey }) {
    const [value, setValue] = React.useState("");

    return (
        <input
            type="text"
            className="fill-blank-box"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onDrop={(e) => {
                e.preventDefault();
                const droppedWord = e.dataTransfer.getData("text/plain");
                if (droppedWord) {
                    setValue(droppedWord);
                }
            }}
            onDragOver={(e) => e.preventDefault()} // Cho phép thả vào input
            placeholder="..."
        />
    );
}

export class FillBlankNode extends DecoratorNode {
    // Xác định kiểu node này là "fill-blank" – dùng để phân biệt giữa các loại node khác trong hệ thống.
    static getType() {
        return "fill-blank";
    }
    // Lexical dùng hàm clone() để sao chép node khi cần copy/paste hoặc undo/redo.
    // node.__key là ID của node gốc.
    static clone(node) {
        return new FillBlankNode(node.__key);
    }
    // createDOM() tạo phần tử HTML để chứa node (ở đây là <span>).
    createDOM() {
        const span = document.createElement("span");
        return span;
    }
    // updateDOM() trả về false nghĩa là DOM không cần cập nhật lại khi node thay đổi — vì phần hiển thị được xử lý qua React component.
    updateDOM() {
        return false;
    }
    // Đây là phần quan trọng nhất với DecoratorNode – nó render ra React component (<input>) gắn với node.
    // this.getKey() lấy ID node để truyền cho component nếu muốn dùng sau này.
    decorate() {
        return <FillBlankComponent nodeKey={this.getKey()} />;
    }
    // Cho phép node này có thể được serialize/deserialize (ví dụ: khi lưu nội dung vào DB, export ra JSON).
    // Ở đây chưa có dữ liệu cụ thể đi kèm nên JSON rất đơn giản.
    static importJSON(_serializedNode) {
        return new FillBlankNode(); // quan trọng!
    }
    exportJSON() {
        return {
            type: "fill-blank",
            version: 1,
        };
    }
}
