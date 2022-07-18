/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {SafeAreaView, Button, StyleSheet} from 'react-native';
import {CanvasRenderingContext2D} from './src/htmlcanvas/canvas2dcontext';

import Canvas from './src/canvas/canvas';

const App = () => {
  const myCanvasRef: any = useRef({});

  const drawRect = () => {
    myCanvasRef.current.draw((ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.fillStyle = '#ff0';
      ctx.fillRect(10, 10, 100, 200);
      ctx.strokeStyle = '#0000ff';
      ctx.strokeRect(200, 220, 50, 100);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = 'blue';
      ctx.fillRect(250, 250, 75, 50);
      ctx.fillStyle = 'green';
      ctx.fillRect(280, 280, 75, 50);
      ctx.restore();
    });
  };

  const drawCircle = () => {
    myCanvasRef.current.draw((ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'red';
      ctx.strokeStyle = '#f000ff';
      ctx.beginPath();
      ctx.arc(100, 50, 50, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };

  const drawText = () => {
    myCanvasRef.current.draw((ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = '#0000ff';
      ctx.font = '30px Arial';
      const txt = 'Hello World';
      ctx.fillText('width:' + ctx.measureText(txt).width, 10, 200);
      ctx.fillText(txt, 10, 250);
    });
  };

  const drawShadow = () => {
    myCanvasRef.current.draw((ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'black';
      ctx.fillStyle = 'blue';
      ctx.fillRect(90, 20, 50, 100);
      ctx.restore();
      ctx.fillRect(140, 20, 50, 100);
    });
  };

  const clearCanvas = () => {
    myCanvasRef.current.draw((ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, myCanvasRef.current.width, myCanvasRef.current.height);
    });
  };

  return (
    <SafeAreaView>
      <Canvas style={styles.canvas} ref={myCanvasRef} width={400} height={400} />
      <Button onPress={() => drawRect()} title="DrawRect" />
      <Button onPress={() => drawCircle()} title="DrawCircle" />
      <Button onPress={() => drawText()} title="DrawText" />
      <Button onPress={() => drawShadow()} title="Shadow" />
      <Button onPress={() => clearCanvas()} title="Clear" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 400,
    width: 400,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
});

export default App;
