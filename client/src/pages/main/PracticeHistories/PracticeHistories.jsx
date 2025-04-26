import React, { useState, useEffect } from "react";
import {
  Stack,
  Group,
  Text,
  Badge,
  Title,
  Accordion,
  List,
  ThemeIcon,
  Pagination,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PracticeHistories() {
  const [histories, setHistories] = useState([]);
  const [historyDetails, setHistoryDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/practice_histories?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch practice histories");
        }
        const responseData = await response.json();
        const historiesData = Array.isArray(responseData)
          ? responseData
          : responseData.data || [];
        setHistories(historiesData);
        setTotalPages(responseData.pagination.pages);
      } catch (error) {
        console.error("Error fetching practice histories:", error);
        setHistories([]);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistories();
  }, [page, limit]);

  const fetchHistoryDetails = async (historyId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/practice_histories/${historyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch practice history details");
      }
      const responseData = await response.json();
      if (responseData.success && responseData.data) {
        setHistoryDetails((prev) => ({
          ...prev,
          [historyId]: responseData.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching history details:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAccordionChange = (value) => {
    if (value && !historyDetails[value]) {
      fetchHistoryDetails(value);
    }
  };

  return (
    <Stack spacing="md">
      <Title order={2}>Practice History</Title>
      {!Array.isArray(histories) || histories.length === 0 ? (
        <Text>No practice history available</Text>
      ) : (
        <Accordion variant="separated" onChange={handleAccordionChange}>
          {histories.map((history) => (
            <Accordion.Item key={history._id} value={history._id}>
              <Accordion.Control>
                <Group position="apart">
                  <Text size="lg" fw={500}>
                    {formatDate(history.createdAt)}
                  </Text>
                  <Badge
                    size="lg"
                    variant="gradient"
                    gradient={
                      history.score >= 7
                        ? { from: "teal", to: "lime" }
                        : { from: "yellow", to: "orange" }
                    }
                  >
                    Score: {history.score}/{history.totalQuestions}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {historyDetails[history._id] ? (
                  <List spacing="xs" size="sm">
                    {historyDetails[history._id].wordResults.map((result) => (
                      <List.Item
                        key={result._id}
                        icon={
                          <ThemeIcon
                            color={result.isCorrect ? "teal" : "red"}
                            size={24}
                            radius="xl"
                          >
                            {result.isCorrect ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconX size={16} />
                            )}
                          </ThemeIcon>
                        }
                      >
                        <Group position="apart" style={{ width: "100%" }}>
                          <Group spacing="xs">
                            <Text fw={500}>{result.wordId.word}</Text>
                            <Text color="dimmed">
                              ({result.wordId.meaning})
                            </Text>
                          </Group>
                        </Group>
                      </List.Item>
                    ))}
                  </List>
                ) : (
                  <Text>Loading details...</Text>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
          <Group justify="center" mt="md">
            <Pagination value={page} onChange={setPage} total={totalPages} />
          </Group>
        </Accordion>
      )}
    </Stack>
  );
}

export default PracticeHistories;
