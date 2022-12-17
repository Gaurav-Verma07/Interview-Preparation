import { Box, Container, createStyles, Pagination, Text, TextInput, ThemeIcon } from '@mantine/core';
import { useDebouncedValue, usePagination } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import React from 'react';
import { data } from './HrRoundData';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
const useStyles = createStyles((theme) => {
  return {
    box: {
      transition: 'all .3s',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.teal,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
      boxShadow: theme.shadows.sm,
      borderRadius: theme.radius.md,
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
  };
});

const PAGE_SIZE = 7;

const HrRound = () => {
  const { classes } = useStyles();
  const [page, setPage] = useState(1);
  const [pageRecords, setPageRecords] = useState(data.slice(0, PAGE_SIZE));
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setPageRecords(
      data.filter(({ question }) => {
        if (debouncedQuery !== '' && !`${question} `.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return false;
        }
        return true;
      }),
    );
  }, [debouncedQuery]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setPageRecords(data.slice(from, to));
  }, [page]);

  return (
    <Container>
      <TextInput
        mb={30}
        sx={{ flexBasis: '40%', borderColor: 'teal' }}
        placeholder="Search here..."
        icon={<IconSearch size={16} />}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      {pageRecords.map((item: any) => {
        return (
          <Box
            //   component="a"
            //   width={100}
            key={item.id}
            onClick={() => {
              console.log(item.id);
              navigate(item.id);
            }}
            p={10}
            mb={20}
            className={classes.box}
          >
            <Text align="left" p={5}>
              {item.question}
            </Text>
          </Box>
        );
      })}
      <div>
        <Pagination
          //   mt={100}
          total={10}
          position="center"
          onChange={(index) => {
            // console.log(page)
            setPage(index);
          }}
          styles={(theme) => ({
            item: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
              },
            },
          })}
        />
      </div>
    </Container>
  );
};
export default HrRound;
