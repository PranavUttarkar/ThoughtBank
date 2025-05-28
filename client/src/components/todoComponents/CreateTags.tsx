import React, { useState } from "react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Tag,
  Stack,
  HStack,
} from "@chakra-ui/react";

const CreateTags: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    console.log(tags);
  };

  return (
    <Fieldset.Root
      size="lg"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      padding={4}
      boxShadow="lg"
    >
      <Stack>
        <Stack>
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            Contact Details
          </Fieldset.Legend>
          <Fieldset.HelperText fontSize="sm" color="gray.600">
            Please provide your contact details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Stack>
            <Field.Root>
              <Field.Label fontWeight="medium">Tags</Field.Label>
              <Stack>
                <Input
                  placeholder="Enter a tag"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  borderWidth="1px"
                  borderRadius="md"
                />
                <Button colorScheme="teal" onClick={handleAddTag}>
                  Add Tag
                </Button>
                <Stack>
                  {tags.map((tag) => (
                    <HStack key={tag}>
                      <Tag.Root size="md" colorPalette="teal" variant="solid">
                        <Tag.Label>{tag}</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Tag.EndElement>
                      </Tag.Root>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            </Field.Root>
          </Stack>
        </Fieldset.Content>
      </Stack>
    </Fieldset.Root>
  );
};

export default CreateTags;
