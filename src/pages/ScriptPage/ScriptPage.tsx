import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { BlockType } from './ScriptBlock';
import { ScriptBlock } from './ScriptBlock';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Тема сценария
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Финансовые нарушения, Защита персональных данных
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque porta
        facilisis. Quisque ut arcu eros. Maecenas quam urna, sagittis eget facilisis ac, vehicula
        nec ante. Cras interdum fermentum sem ac porttitor. Nulla gravida purus id risus tempor
        gravida. Vivamus malesuada id quam sit amet convallis. Nam et eros maximus, ultricies ex
        vehicula, ullamcorper sem. Donec non suscipit dolor.
        <br />
        <br />
        Duis lorem dolor, fermentum eu augue a, dictum dapibus ante. Sed eget fringilla lectus. Ut
        vel nisi at erat tincidunt viverra. Vestibulum eleifend ac turpis quis malesuada. Aenean
        semper convallis purus ac porttitor. Nullam metus nunc, condimentum vitae elementum
        ultricies, maximus sit amet sem. Suspendisse sollicitudin tincidunt velit, eu cursus nibh
        pretium non. Duis id nisi iaculis, vehicula diam nec, elementum orci. Cras maximus dolor ut
        placerat interdum.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Начать выполнение</Button>
    </CardActions>
  </React.Fragment>
);

const ScriptCard = () => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

// TODO: add types
function createOnSubmit(blocks: any, updateBlocks: any) {
  function onSubmit(blockId: number, blocktype: BlockType, value: any) {
    const newblock = BlockType.Checkbox;
    // TODO: send blockid, blocktype, value to backend
    updateBlocks([...blocks, newblock]);
  }
  return onSubmit;
}

export const ScriptPage = () => {
  const [blockList, updateBlockList] = React.useState([BlockType.Checkbox]);
  const onSubmit = createOnSubmit(blockList, updateBlockList);

  return (
    <Box>
      <ScriptCard />
      <br />
      {
        blockList.map((block, idx) => (
          <ScriptBlock key={idx} blockType={block} onSubmit={onSubmit} />
        ))
      }
    </Box>
  );
};
