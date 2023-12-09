import {
  Grid,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { Bar } from '../Bar';
import { useState } from 'react';
import { QuizBackend } from '../QuizPage/QuizModels';
import { getQuizList } from '../../backend';
import { QuizCardHor } from '../../components/QuizCardHor';
import { useNavigate } from 'react-router-dom';

interface IQuizCard {
  title: string;
  caption: string;
  imagePath: string;
  onClick?: () => void;
}

const QuizCardVert = ({ title, caption, imagePath, onClick }: IQuizCard) => {
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="200" image={`/${imagePath}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={onClick}>
          Открыть
        </Button>
      </CardActions>
    </Card>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();

  const [quizList, setQuizList] = useState<QuizBackend[]>([]);

  if (quizList.length === 0) {
    getQuizList().then((res) => {
      setQuizList(res.data);
    });
  }

  return (
    <Bar>
      <Box mt={12}>
        <Container maxWidth="lg">
          <Typography variant="h4" mb={2}>
            Типы тестирования
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            columnSpacing={2}
          >
            <Grid item xs={4}>
              <QuizCardVert
                title="Простые тесты"
                caption="Раздел для быстрых и познавательных проверок знаний в
                области безопасности в сети. Пройдите наши тесты, чтобы укрепить
                свои знания о защите информации, обнаружении угроз и правилах
                безопасного поведения в онлайне."
                imagePath="quiz.avif"
                onClick={() => navigate('/quizzes?complexity=1')}
              />
            </Grid>
            <Grid item xs={4}>
              <QuizCardVert
                title="Решение кейсов"
                caption="Погружение в мир практических сценариев и задач в
                области информационной безопасности. В этом разделе вы найдете
                увлекательные кейсы, требующие вашего внимания и аналитического
                мышления. Попробуйте свои силы, разрабатывая стратегии и находя
                решения для реальных проблем в сфере кибербезопасности."
                imagePath="branched.png"
                onClick={() => navigate('/quizzes?complexity=3')}
              />
            </Grid>
            <Grid item xs={4}>
              <QuizCardVert
                title="Практические тренинги"
                caption="Углубленные обучающие программы, предназначенные для
                профессионалов в области информационной безопасности. В этом
                разделе вы найдете практические занятия, разработанные
                экспертами, чтобы повысить вашу квалификацию в реальных
                сценариях."
                imagePath="training.avif"
                onClick={() => navigate('/quizzes?complexity=5')}
              />
            </Grid>
          </Grid>

          <br />
          <Typography variant="h4" mb={2} mt={3}>
            Тестирование компетенций
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnSpacing={2}
            rowSpacing={2}
          >
            <Grid item xs={6}>
              <QuizCardVert
                title="Финансовые нарушения"
                caption="Раздел, посвященный обучению и анализу сферы финансовых
                аспектов в контексте безопасности. Изучайте случаи финансовых
                нарушений, анализируйте методы противодействия и повышайте свою
                компетенцию в предотвращении финансовых рисков."
                imagePath="robber.webp"
                onClick={() => navigate('/quizzes?category=finance')}
              />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert
                title="Защита персональных данных"
                caption="Специализированный раздел, предназначенный для обучения
                методам и технологиям обеспечения конфиденциальности информации.
                Изучайте передовые стратегии и техники защиты личных данных,
                разрабатывайте навыки обнаружения и предотвращения утечек."
                imagePath="personal.jpg"
                onClick={() => navigate('/quizzes?category=personal_data')}
              />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert
                title="Защита личных цифровых устройств"
                caption="Ваш путь к обеспечению безопасности в цифровом мире. В
                этом разделе вы узнаете о передовых методах защиты своих
                устройств от вредоносных атак, вирусов и киберугроз. Освойте
                практические навыки по обеспечению безопасности вашего
                компьютера, смартфона и других гаджетов."
                imagePath="device-security.png"
                onClick={() => navigate('/quizzes?category=devices_security')}
              />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert
                title="Правила работы в сети интернет"
                caption="Обучающий раздел, посвященный основам безопасного и
                эффективного взаимодействия в онлайн-пространстве. Изучайте
                правила цифровой гигиени, этикет и защиты личной информации.
                Поднимайте свою киберграмотность, соблюдая правила безопасного
                поведения в сети, и ощутите уверенность в своем
                онлайн-присутствии."
                imagePath="internet-rules.jpg"
                onClick={() => navigate('/quizzes?category=web')}
              />
            </Grid>
          </Grid>

          <br />
          <Typography variant="h4" mb={2} mt={3}>
            Последние квизы
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnSpacing={0}
            rowSpacing={2}
          >
            {quizList.map((quiz, i) => (
              <Grid item key={i} xs={12}>
                <QuizCardHor title={quiz.title} category={quiz.category} quizId={quiz.quiz_id} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Bar>
  );
};
