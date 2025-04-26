import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppShell, Group, Title, Tabs } from "@mantine/core";
import { BookOpenCheck } from "lucide-react";
import Login from "../../pages/auth/Login/Login";
import Register from "../../pages/auth/Register/Register";
import "./AuthLayout.css";

function AuthLayout() {
  const location = useLocation();
  const currentTab = location.pathname.includes("register")
    ? "register"
    : "login";

  return (
    <AppShell header={{ height: 60 }} padding="md" bg="gray.1">
      <AppShell.Header className="header">
        <Group h="100%" px="md">
          <Group>
            <BookOpenCheck size={28} color="white" />
            <Title order={3} c="white">
              VocabMaster
            </Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Tabs value={currentTab}>
          <Tabs.List justify="center" mb="xl">
            <Tabs.Tab value="login" component={Link} to="/auth/login">
              Login
            </Tabs.Tab>
            <Tabs.Tab value="register" component={Link} to="/auth/register">
              Register
            </Tabs.Tab>
          </Tabs.List>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}

export default AuthLayout;
