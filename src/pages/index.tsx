import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) => {
      return api.get('/api/images', {
        params: {
          after: pageParam
        }
      })
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.after ?? null
      }
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages[0].data.data
  }, [data]);

  return (
    isLoading ? (
      <Loading />
    ) : isError ? (
      <Error />
    ) : (
      <>
        <Header />

        <Box maxW={1120} px={20} mx="auto" my={20}>
          <CardList cards={formattedData} />
          {hasNextPage && (
            <Button
              color="pGray.50"
              mt="2.5rem"
              onClick={() => fetchNextPage()}
            >
              {!isFetchingNextPage ? 'Carregar mais' : 'Carregando...'}
            </Button>
          )}
        </Box>
      </>
    )
  )
}
