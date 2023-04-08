import React, {useState} from 'react';
import Layout from "../layout";
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {getRandomPrompt} from "../utils";
import {Helmet} from "react-helmet";
import {IconGrain, IconShape, IconShare} from '@tabler/icons-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
      prompt: '',
      photo: '',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      // name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      prompt: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    }
  });

  const generateImage = async (): Promise<any> => {
    if (form.values.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dalle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({prompt: form.values.prompt}),
        });

        const data = await response.json();
        form.setValues({...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (e) {
        console.log(e);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter prompt');
    }
  }
  const handleSubmit = async (values: any): Promise<any> => {
    if (values.prompt && values.photo) {
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        });

        await response.json();
        navigate('/');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt message and generate an image');
    }
  }

  const handleSupriseMe = (): void => {
    const randomPrompt = getRandomPrompt(form.values.prompt);
    form.setValues({prompt: randomPrompt});
  }

  return (
    <>
      <Helmet>
        <title>Create Image</title>
      </Helmet>
      <Layout>
        <Container>
          <Title mb="md">Create</Title>
          <Text mb="md">Create imaginative and visually stunning images throught DALL-E AI and share with the
            community.</Text>
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <Stack spacing="md" align="flex-start">
              <TextInput
                label="Name"
                placeholder="name"
                {...form.getInputProps('name')}
              />
              <Stack align="flex-start">
                <Textarea
                  label="Prompt"
                  placeholder="A comic book cover of a superhero wearing headphones"
                  mt="md"
                  rows={4}
                  sx={{width: 600}}
                  {...form.getInputProps('prompt')}
                />
                <Button
                  onClick={handleSupriseMe}
                  loading={generatingImg}
                  leftIcon={<IconGrain size={14}/>}
                  variant="subtle"
                >
                  Get suggestions
                </Button>
              </Stack>
              <Box w={200} h={200} pos="relative">
                <Image
                  mx="auto"
                  radius="md"
                  src={form.values.photo ?? null}
                  alt="Random image"
                  withPlaceholder
                  width={200} height={200}/>
                <LoadingOverlay visible={generatingImg} overlayBlur={2}/>
              </Box>
              <Button
                type="button"
                mt="md"
                onClick={generateImage}
                loading={generatingImg}
                leftIcon={<IconShape size={18}/>}
                size="md"
              >
                Generate Image
              </Button>
              <Group>
                <Text size="sm">Once you have created the image you want, you can share it with others in the
                  community.</Text>
                <Button
                  type="submit"
                  variant="subtle"
                  loading={loading || generatingImg}
                  leftIcon={<IconShare size={14}/>}
                >
                  Share with community</Button>
              </Group>
            </Stack>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default CreatePost;
