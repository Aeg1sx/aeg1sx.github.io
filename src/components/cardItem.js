import React, { useState, useEffect } from 'react';
import { Box, Button, Image, Center, Spinner } from '@chakra-ui/react';

const CardGame = () => {
  // 카드 이미지 URL (임시)
  var result = []
  for(let i=1; i <= 10; i++){
    result.push('/images/' + i + '.png')
  }
  const Snd = new Audio('/sounds/next_card.mp3');
  const clearGame = new Audio('/sounds/clear.mp3');
  const [currentCard, setCurrentCard] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawnCards, setDrawnCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([...result]);

  useEffect(() => {
    if (!loading && currentCard) {
      setDrawnCards(prev => [...prev, currentCard]);
      setAvailableCards(prev => prev.filter(card => card !== currentCard));
    }
  }, [loading, currentCard]);

  const drawCard = () => {
    setLoading(true);
    let interval = setInterval(() => {
      if (availableCards.length === 0) {
        clearInterval(interval);
        return;
      }
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      setCurrentCard(availableCards[randomIndex]);
      Snd.play();
    }, 100 + Math.random() * 400);
    setTimeout(() => {
      clearInterval(interval);
      clearGame.play();
      setLoading(false);
    }, 3000 + Math.random() * 2000);
  };

  const resetGame = () => {
    setCurrentCard('');
    setDrawnCards([]);
    setAvailableCards([...result]);
  };

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Image src={currentCard || '/images/question_mark.jpg'} alt="카드 뽑기를 눌러주세요." width={450} height={700}/>
        <Button colorScheme="blue" m={4} onClick={drawCard} disabled={loading || availableCards.length === 0}>
          카드 뽑기
        </Button>
        <Button colorScheme="red" m={4} onClick={resetGame}>
          게임 초기화(누르지마)
        </Button>
      </Box>
    </Center>
  );
};

export default CardGame;