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

const ThumbnailCreator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [selectedIcons, setSelectedIcons] = useState<Skill[]>([]);

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
              <Label htmlFor='message' className='text-left pl-1'>
                Project technologies
              </Label>
              <ToggleGroup
                type='multiple'
                variant='outline'
                className='mt-4 flex-wrap'>
                {SKILLS.map((item) => (
                  <ToggleGroupItem
                    key={item.title}
                    onClick={() => handleIconSelection(item)}
                    value={item.title}
                    aria-label='Toggle bold'>
                    {item.title}
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
            <div className='relative border rounded w-full h-64 bg-gray-100 flex items-center justify-center'>
              {image && (
                <img
                  src={image}
                  alt='Thumbnail background'
                  className='w-full h-full object-cover rounded'
                />
              )}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
                <p className='text-3xl font-bold'>{text}</p>
                <div className='flex gap-2 mt-2'>
                  {selectedIcons.map((item) => (
                    <item.icon
                      key={item.title}
                      className='w-6 h-6'
                      color='red'
                    />
                  ))}
                </div>
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
