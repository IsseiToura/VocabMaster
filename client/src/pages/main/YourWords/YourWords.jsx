import React, { useState, useEffect } from "react";
import {
  Group,
  Button,
  Stack,
  Select,
  Pagination,
  Text,
  Grid,
} from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import WordCard from "../../../components/WordCard";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function YourWords() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnglish, setShowEnglish] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("newest");
  const [timeFilter, setTimeFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [newWord, setNewWord] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/your_words?page=${page}&limit=${limit}&sort=${sort}${
            timeFilter ? `&timeFilter=${timeFilter}` : ""
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setWords(data.data);
          setTotalPages(data.pagination.pages);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [page, limit, sort, timeFilter]);
  const handleDeleteWord = async (wordId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/your_words/${wordId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setWords(words.filter((word) => word._id !== wordId));
      }
      setLoading(false);
      toast.success("Word deleted successfully");
    } catch (error) {
      setError(error.message);
    }
  };
  const createWords = async () => {
    const emptyWord = {
      word: "",
      pronunciation: "",
      meaning: "",
      example: "",
      ieltsLevel: "",
      createdAt: new Date().toISOString(),
    };
    setNewWord(emptyWord);
  };

  const handleNewWordChange = (field, value) => {
    setNewWord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveNewWord = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/your_words/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWord),
      });
      const data = await response.json();
      if (data.success) {
        setPage(1);
        setNewWord(null);
        const refreshResponse = await fetch(
          `${API_BASE_URL}/your_words?page=1&limit=${limit}&sort=${sort}${
            timeFilter ? `&timeFilter=${timeFilter}` : ""
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          setWords(refreshData.data);
          setTotalPages(refreshData.pagination.pages);
        }
        toast.success("Word created successfully");
      } else {
        if (data.errors) {
          // Display each validation error message
          data.errors.forEach((error) => {
            toast.error(`${error.path}: ${error.msg}`);
          });
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to create word");
    }
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Text fw={700} size="lg">
          Your Words
        </Text>
        <Group>
          <Select
            value={sort}
            onChange={(value) => {
              if (value) {
                setSort(value);
                setPage(1);
              }
            }}
            data={[
              { value: "newest", label: "Newest First" },
              { value: "oldest", label: "Oldest First" },
            ]}
          />
          <Select
            value={timeFilter}
            onChange={(value) => {
              if (value !== null) {
                setTimeFilter(value);
              }
            }}
            data={[
              { value: "", label: "All Time" },
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
            ]}
          />
          <Button
            variant="subtle"
            leftSection={showEnglish ? <EyeOff size={16} /> : <Eye size={16} />}
            onClick={() => setShowEnglish(!showEnglish)}
            color="grape"
          >
            {showEnglish ? "Hide English" : "Show English"}
          </Button>
        </Group>
      </Group>
      <Button onClick={createWords} w="fit-content" align="left">
        Create Words
      </Button>
      <Grid>
        {newWord && (
          <Grid.Col span={{ base: 12, sm: 12 }}>
            <Group align="center" wrap="wrap" gap="md" h="100%">
              <WordCard
                word={newWord}
                showEnglish={showEnglish}
                isEditable={true}
                onWordChange={handleNewWordChange}
              />
              <Group>
                <Button onClick={saveNewWord} color="blue">
                  Save
                </Button>
                <Button onClick={() => setNewWord(null)} color="red">
                  Cancel
                </Button>
              </Group>
            </Group>
          </Grid.Col>
        )}
        {words.map((word) => (
          <Grid.Col key={word._id} span={{ base: 12, sm: 12 }}>
            <Group align="center" wrap="wrap" gap="md" h="100%">
              <WordCard word={word} showEnglish={showEnglish} />
              <Button
                variant="gradient"
                gradient={{ from: "red", to: "orange", deg: 105 }}
                onClick={() => handleDeleteWord(word._id)}
                h={50}
                w={{ base: "100%", sm: "auto" }}
              >
                Delete
              </Button>
            </Group>
          </Grid.Col>
        ))}
      </Grid>
      <Group justify="center" mt="md">
        <Pagination value={page} onChange={setPage} total={totalPages} />
      </Group>
    </Stack>
  );
}

export default YourWords;
