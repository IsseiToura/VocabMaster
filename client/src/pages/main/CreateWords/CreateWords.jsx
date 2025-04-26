import React, { useState } from "react";
import {
  Group,
  Select,
  Button,
  Stack,
  Grid,
  Alert,
  Title,
} from "@mantine/core";
import { Plus } from "lucide-react";
import "./CreateWords.css";
import { IELTS_LEVELS } from "../../../constants/ieltsLevel";
import WordCard from "../../../components/WordCard";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CreateWords() {
  const [ieltsLevel, setIeltsLevel] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("jwt");

  const handleGenerateWords = async () => {
    if (!ieltsLevel) {
      setError("Please select an IELTS level before creating words");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/words_generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ieltsLevel }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setError(errorData.message);
        } else {
          throw new Error("Failed to generate words");
        }
        return;
      }
      const data = await response.json();
      setWords(data.words);
      toast.success("Words generated successfully");
    } catch (error) {
      console.error("Error generating words:", error);
      toast.error("Failed to generate words");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWord = async (wordId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/words_generate/save_selected`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ wordIds: [wordId] }),
        }
      );
      if (!response.ok) throw new Error("Failed to save word");
      setWords(words.filter((word) => word._id !== wordId));
      toast.success("Word saved successfully");
    } catch (error) {
      console.error("Error saving word:", error);
      toast.error("Failed to save word");
    }
  };

  return (
    <Stack className="container">
      <Title order={1} mb="lg" className="header-title">
        Create Your Personal Vocabulary Book
      </Title>
      <Text mb="xl" c="dimmed">
        Generate English words based on your IELTS level and build your own
        vocabulary book. Save words and enhance your English learning
        efficiently!
      </Text>
      <Group className="selectContainer" wrap="wrap" gap="md">
        <Select
          label="Select IELTS Level"
          placeholder="Choose level"
          data={IELTS_LEVELS}
          value={ieltsLevel}
          onChange={setIeltsLevel}
          w={{ base: "100%", sm: 200 }}
        />
        <Button
          leftSection={<Plus size={16} />}
          mt={{ base: 0, sm: 24 }}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleGenerateWords}
          loading={loading}
        >
          Create English Words
        </Button>
      </Group>
      {error && (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      )}
      <Grid>
        {words.map((word) => (
          <Grid.Col key={word._id} span={{ base: 12, sm: 12 }}>
            <Group align="center" wrap="wrap" gap="md" h="100%">
              <WordCard word={word} showEnglish={true} />
              <Button
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                onClick={() => handleSaveWord(word._id)}
                h={50}
                w={{ base: "100%", sm: "auto" }}
              >
                Add to My Words
              </Button>
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export default CreateWords;
