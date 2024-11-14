import React, { useState } from 'react';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from './FileUploader';
import ReactIcon from '../assets/technologies/react.svg?react';
import AwsIcon from '../assets/technologies/aws.svg?react';
import Css3Icon from '../assets/technologies/css3.svg?react';
import CypressIcon from '../assets/technologies/cypress.svg?react';
import Html5Icon from '../assets/technologies/html5.svg?react';
import JestIcon from '../assets/technologies/jest.svg?react';
import JsIcon from '../assets/technologies/js.svg?react';
import MuiIcon from '../assets/technologies/mui.svg?react';
import NextJsIcon from '../assets/technologies/next-js.svg?react';
import PrismicIcon from '../assets/technologies/prismic.svg?react';
import RtkIcon from '../assets/technologies/rtk.svg?react';
import TailwindIcon from '../assets/technologies/tailwind.svg?react';
import TsIcon from '../assets/technologies/ts.svg?react';
import Laptop from '../assets/laptop.png';

type Skill = {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
const SKILLS: Skill[] = [
  { title: 'React', icon: ReactIcon },
  { title: 'Next.js', icon: NextJsIcon },
  { title: 'Typescript', icon: TsIcon },
  { title: 'Redux', icon: RtkIcon },
  { title: 'Tailwind CSS', icon: TailwindIcon },
  { title: 'Material UI', icon: MuiIcon },
  { title: 'AWS', icon: AwsIcon },
  { title: 'CSS3', icon: Css3Icon },
  { title: 'HTML5', icon: Html5Icon },
  { title: 'Js', icon: JsIcon },
  { title: 'Cypress', icon: CypressIcon },
  { title: 'Jest', icon: JestIcon },
  { title: 'Prismic', icon: PrismicIcon },
];

const Colors = ['white', 'gray', 'black'];

const ThumbnailCreator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [selectedIcons, setSelectedIcons] = useState<Skill[]>([]);
  const [color, setColor] = useState<string>(Colors[0]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Handle icon selection
  const handleIconSelection = (skill: Skill) => {
    setSelectedIcons((prevSelectedSkills) => {
      const isAlreadySelected = prevSelectedSkills.some(
        (s) => s.title === skill.title
      );

      if (isAlreadySelected) {
        // Remove the skill if it’s already selected
        return prevSelectedSkills.filter((s) => s.title !== skill.title);
      } else {
        // Add the skill if it’s not selected
        return [...prevSelectedSkills, skill];
      }
    });
  };

  // Download thumbnail as image
  const downloadThumbnail = () => {
    // Render the preview as a canvas or download as-is
    // For simplicity, we're saving just the background image and overlay
    console.log('save as');
    // saveAs(image as string, 'thumbnail.png');
  };

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-xl font-bold mb-5'>Thumbnail Creator</h1>
      <div className='grid grid-cols-2 gap-3'>
        <Card>
          <CardHeader>
            <CardTitle>Create project thumbnail</CardTitle>
            <CardDescription>
              You need to upload thumbnail background, provide project title and
              select technologies to show at thumbnail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full gap-1.5'>
              <Label className='text-left pl-1'>Project image</Label>
              <FileUploader onFileUpload={handleFileUpload} />
            </div>

            <div className='grid w-full gap-1.5 mt-4'>
              <Label htmlFor='message' className='text-left pl-1'>
                Project title
              </Label>
              <Textarea
                value={text}
                placeholder='Type your text here.'
                id='message'
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            {/* Skills selection */}
            <div className='grid w-full gap-1 mt-4'>
              <Label className='text-left pl-1'>Project technologies</Label>
              <ToggleGroup
                type='multiple'
                variant='outline'
                className='mt-4 flex-wrap'>
                {SKILLS.map((item) => (
                  <ToggleGroupItem
                    key={item.title}
                    onClick={() => handleIconSelection(item)}
                    value={item.title}
                    aria-label={`Toggle ${item.title} selection`}>
                    {item.title}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            {/* Color selection */}
            <div className='grid w-full gap-1 mt-4'>
              <Label className='text-left pl-1'>Color selection</Label>
              <ToggleGroup
                type='single'
                variant='default'
                className='mt-4 flex-wrap'>
                {Colors.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    onClick={() => setColor(item)}
                    value={item}
                    aria-label={`Toggle ${color}`}>
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Thumbnail Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='relative border rounded w-full h-64 flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden'>
              {/* Left Column: Text and Technologies */}
              <div className='flex flex-col justify-center items-start pl-4 w-[50%] text-left'>
                <p className='text-3xl font-bold' style={{ color: color }}>
                  {text}
                </p>
                <div className='flex gap-2 mt-2'>
                  {selectedIcons.map((item) => (
                    <item.icon
                      key={item.title}
                      className='w-5 h-5'
                      color={color}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Laptop Image with Background Image on Screen */}
              <div className='relative w-[50%]'>
                {/* Background Image on Laptop Screen */}
                {image && (
                  <img
                    src={image}
                    alt='Thumbnail background'
                    className='absolute w-[240px] max-w-[240px] h-[165px] left-[30px] object-cover top-[28px] z-10'
                  />
                )}

                {/* Laptop Image with Transparent Screen  -right-7*/}
                <img
                  src={Laptop}
                  alt='Laptop'
                  className='absolute top-1/2 w-[300px] h-auto -translate-y-1/2 max-w-[300px]'
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button onClick={downloadThumbnail}>
              <DownloadIcon /> Download Thumbnail
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ThumbnailCreator;
