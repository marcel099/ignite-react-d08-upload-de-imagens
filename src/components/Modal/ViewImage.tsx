import { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Skeleton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const initialRef = useRef()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent
        bgColor="pGray.800"
        w="auto"
        maxW="900px"
      >
        <ModalBody
          p={0}
        >
          <Skeleton
            isLoaded={!isLoading}
          >
            <Image
              src={imgUrl}
              maxW="900px"
              maxH="600px"
              onLoad={() => setIsLoading(false)}
              ref={initialRef}
            />
          </Skeleton>
        </ModalBody>
        <ModalFooter
          justifyContent="flex-start"
          pl="0.625rem"
          py="0.5rem"
        >
          <Link
            href={imgUrl}
            target="_blank"
            rel="external"
            fontSize={14}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
