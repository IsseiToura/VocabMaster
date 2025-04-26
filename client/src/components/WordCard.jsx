import React from "react";
import { Card, Group, Text, TextInput } from "@mantine/core";

function WordCard({ word, showEnglish, isEditable, onWordChange }) {
  // Get the actual word data from wordId and add null check
  const wordData = word?.wordId || word || {};

  // Helper function to safely get word data with default values
  const getWordData = (field, defaultValue = "") => {
    return wordData[field] || defaultValue;
  };

  if (isEditable) {
    return (
      <Card className="wordCard" w={1400}>
        <Group className="wordContent">
          <div className="wordInfo">
            <TextInput
              label="Word"
              value={getWordData("word")}
              onChange={(e) => onWordChange("word", e.target.value)}
              placeholder="Enter word"
              required
            />
            <TextInput
              label="Pronunciation"
              value={getWordData("pronunciation")}
              onChange={(e) => onWordChange("pronunciation", e.target.value)}
              placeholder="Enter pronunciation"
            />
            <TextInput
              label="Meaning"
              value={getWordData("meaning")}
              onChange={(e) => onWordChange("meaning", e.target.value)}
              placeholder="Enter meaning"
              required
            />
            <TextInput
              label="Example"
              value={getWordData("example")}
              onChange={(e) => onWordChange("example", e.target.value)}
              placeholder="Enter example sentence"
            />
            <TextInput
              label="IELTS Level"
              value={getWordData("ieltsLevel")}
              onChange={(e) => onWordChange("ieltsLevel", e.target.value)}
              placeholder="Enter IELTS level"
            />
          </div>
        </Group>
      </Card>
    );
  }

  return (
    <Card className="wordCard" w={1400}>
      <Group className="wordContent">
        <div className="wordInfo">
          <Text className="wordTitle">
            Word: {showEnglish ? getWordData("word") : "••••••"}
          </Text>
          <Text className="pronunciation">
            Pronunciation:{" "}
            {showEnglish ? getWordData("pronunciation") : "••••••"}
          </Text>
          <Text>Meaning: {getWordData("meaning")}</Text>
          <Text className="example">
            Example: "
            {showEnglish
              ? getWordData("example")
              : (getWordData("example") || "").replace(
                  getWordData("word") || "",
                  "••••••"
                )}
            "
          </Text>
          <Text>IELTS Level: {getWordData("ieltsLevel")}</Text>
          <Text>
            Date:{" "}
            {wordData.createdAt
              ? new Date(wordData.createdAt).toLocaleDateString()
              : ""}
          </Text>
        </div>
      </Group>
    </Card>
  );
}

export default WordCard;
