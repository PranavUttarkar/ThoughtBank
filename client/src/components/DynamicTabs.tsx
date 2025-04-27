"use client";

import { Button, CloseButton, Heading, Tabs, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Editable } from "@chakra-ui/react";
import { CDNMarkdownEditor } from "./textbox";

interface Item {
  id: string;
  title: string;
  content: React.ReactNode;
}

const items: Item[] = [
  { id: "1", title: "Tab 1", content: "Tab Content" },
  { id: "2", title: "Tab 2", content: "Tab Content" },
  { id: "3", title: "Tab 3", content: "Tab Content" },
  { id: "4", title: "Tab 4", content: "Tab Content" },
];

const uuid = () => {
  return Math.random().toString(36).substring(2, 15);
};

const DynamicTabs = () => {
  const [tabs, setTabs] = useState<Item[]>(items);
  const [selectedTab, setSelectedTab] = useState<string | null>(items[0].id);
  const [name, setName] = useState<string>(""); // Added state for name

  const addTab = () => {
    const newTabs = [...tabs];

    const uid = uuid();

    newTabs.push({
      id: uid,
      title: `Tab`,
      content: `Tab Body`,
    });

    setTabs(newTabs);
    setSelectedTab(newTabs[newTabs.length - 1].id);
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.id !== id);
      setTabs(newTabs);
    }
  };

  return (
    <Tabs.Root
      value={selectedTab}
      variant="enclosed"
      size="sm"
      onValueChange={(e) => setSelectedTab(e.value)}
    >
      <Tabs.List flex="1 1 auto">
        {tabs.map((item) => (
          <Tabs.Trigger value={item.id} key={item.id}>
            <Editable.Root
              value={item.title}
              onValueChange={(e) => {
                setTabs((prevTabs) =>
                  prevTabs.map((tab) =>
                    tab.id === item.id ? { ...tab, title: e.value } : tab
                  )
                );
              }}
              placeholder="Edit title"
            >
              {item.title}
            </Editable.Root>
            <CloseButton
              as="span"
              role="button"
              size="2xs"
              me="-2"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(item.id);
              }}
            />
          </Tabs.Trigger>
        ))}
        <Button
          alignSelf="center"
          ms="2"
          size="2xs"
          variant="ghost"
          onClick={addTab}
        >
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs.map((item) => (
          <Tabs.Content value={item.id} key={item.id}>
            <Editable.Root
              value={tabs.find((tab) => tab.id === item.id)?.content as string}
              onValueChange={(e) => {
                setTabs((prevTabs) =>
                  prevTabs.map((tab) =>
                    tab.id === item.id ? { ...tab, content: e.value } : tab
                  )
                );
              }}
              placeholder="Click to edit"
            >
              <CDNMarkdownEditor />
            </Editable.Root>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
};

export default DynamicTabs;
