// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OnchainNotes {
    struct Note {
        address author;
        string content;
        uint256 timestamp;
    }

    Note[] public notes;

    event NoteAdded(address indexed author, string content, uint256 timestamp);

    function addNote(string calldata content) external {
        require(bytes(content).length > 0, "Content cannot be empty");
        require(bytes(content).length <= 80, "Content too long");

        notes.push(Note({
            author: msg.sender,
            content: content,
            timestamp: block.timestamp
        }));

        emit NoteAdded(msg.sender, content, block.timestamp);
    }

    function getNotesCount() external view returns (uint256) {
        return notes.length;
    }

    function getNote(uint256 index) external view returns (Note memory) {
        return notes[index];
    }
}
