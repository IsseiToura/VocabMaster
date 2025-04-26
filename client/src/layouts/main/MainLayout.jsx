import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppShell,
  Burger,
  Group,
  Title,
  Button,
  Tabs,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BookOpenCheck, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import CreateWords from "../../pages/main/CreateWords/CreateWords";
import YourWords from "../../pages/main/YourWords/YourWords";
import Practice from "../../pages/main/Practice/Practice";
import PracticeHistories from "../../pages/main/PracticeHistories/PracticeHistories";
import "./MainLayout.css";

function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { logout, user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 48em)");

  return (
    <AppShell
      header={{ height: { base: 50, sm: 60 } }}
      navbar={{
        width: { base: 250, sm: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={{ base: "sm", sm: "md" }}
      bg="gray.1"
    >
      <AppShell.Header className="app-shell-header">
        <Group h="100%" px={{ base: "sm", sm: "md" }} justify="space-between">
          <Group>
            {isMobile && (
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                color="white"
              />
            )}
            <Group>
              <BookOpenCheck size={24} color="white" />
              <Title order={3} c="white" fz={{ base: "h4", sm: "h3" }}>
                VocabMaster
              </Title>
            </Group>
          </Group>
          <Group>
            <Text c="white" fw={500} fz={{ base: "sm", sm: "md" }}>
              {`Hello, ${user?.username}`}
            </Text>
            <Button
              variant="subtle"
              color="gray.0"
              leftSection={<LogOut size={16} />}
              onClick={logout}
              size="xs"
            >
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className="app-shell-navbar">
        <Tabs orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="create" component={Link} to="/main/create_words">
              Create Words
            </Tabs.Tab>
            <Tabs.Tab value="words" component={Link} to="/main/words">
              Your Words
            </Tabs.Tab>
            <Tabs.Tab value="practice" component={Link} to="/main/practice">
              Practice
            </Tabs.Tab>
            <Tabs.Tab value="history" component={Link} to="/main/history">
              Practice Histories
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/create_words" element={<CreateWords />} />
          <Route path="/words" element={<YourWords />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/history" element={<PracticeHistories />} />
          <Route path="/" element={<CreateWords />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;
