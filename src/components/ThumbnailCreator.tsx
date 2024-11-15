import React, { useState } from 'react';
import { DownloadIcon } from '@radix-ui/react-icons';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
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
import Logo from '../assets/logo.png';

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
    const node = document.querySelector(
      '.thumbnail-preview'
    ) as HTMLElement | null;

    if (node) {
      toPng(node, {
        pixelRatio: 3, // resolution for better quality
        cacheBust: true,
      })
        .then((dataUrl) => {
          saveAs(dataUrl, 'thumbnail.png'); // Save the image using FileSaver.js
        })
        .catch((error) => {
          console.error('Oops, something went wrong!', error);
        });
    } else {
      console.error('Preview element not found');
    }
  };

  return (
    <div className='max-w-[1200px] mx-auto p-4'>
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
                className='mt-4 flex-wrap gap-2'>
                {Colors.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    style={{
                      backgroundColor: item,
                      boxShadow: '1px 1px 5px rgb(228, 228, 231)',
                      border: `${
                        color === item ? 'solid rgb(228, 228, 231)' : 'none'
                      }`,
                      transform: `${color === item ? 'scale(1.25)' : 'none'}`,
                    }}
                    onClick={() => setColor(item)}
                    value={item}
                    aria-label={`Toggle ${color}`}></ToggleGroupItem>
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
            <div className='thumbnail-preview  w-[469px] h-[375px] ml-auto mr-auto relative border rounded flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden'>
              {/* Left Column: Text and Technologies */}
              <div className='flex flex-col justify-between h-full pl-5 w-[45%] text-left'>
                <img
                  src={Logo}
                  className='w-6 h-6 mt-5'
                  alt='Korobanova logo'
                />
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='text-3xl font-bold' style={{ color: color }}>
                    {text}
                  </p>
                </div>

                <div className='flex gap-2 mt-4 pb-5 justify-start'>
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
              <div className='relative w-[55%] opacity-90'>
                {/* Background Image on Laptop Screen */}
                {image && (
                  <img
                    src={image}
                    alt='Thumbnail background'
                    className='absolute w-[260px] max-w-max h-[163px] left-[25px] object-left-top object-cover top-1/2 -translate-y-1/2 -mt-[5px] z-10'
                  />
                )}

                {/* Laptop Image with Transparent Screen */}
                <img
                  src={Laptop}
                  alt='Laptop'
                  className='absolute top-1/2 w-[350px] h-auto -translate-y-1/2 max-w-max -ml-[20px]'
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
