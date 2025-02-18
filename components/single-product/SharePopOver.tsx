'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'
import { CiShare2 } from 'react-icons/ci'

const SharePopOver = ({
  productId,
  name,
}: {
  productId: string
  name: string
}) => {
  const shareUrl = [
    process.env.NEXT_PUBLIC_WEBSITE_URL,
    'products',
    productId,
  ].join('/')
  const title = `Checkout this awesome ${name}!`
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={'outline'}
          size={'icon'}
          asChild
          className="p-2 cursor-pointer"
        >
          <CiShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareUrl} title={title}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default SharePopOver
