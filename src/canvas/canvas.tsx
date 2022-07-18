import React, {useRef, forwardRef, useImperativeHandle, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {MakeCanvas, HTMLCanvas} from '../htmlcanvas/htmlcanvas';
import {CanvasRenderingContext2D} from '../htmlcanvas/canvas2dcontext';
import {SkiaView, useDrawCallback, SkCanvas, Skia, BlendMode} from '@shopify/react-native-skia';

interface RNCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

const paint = Skia.Paint();
paint.setAntiAlias(true);
paint.setBlendMode(BlendMode.Multiply);

const Canvas = forwardRef((props: RNCanvasProps, ref) => {
  const skiaRef: any = useRef(null);
  const _style = Object.assign({}, props.style, {width: props.width, height: props.height});

  let [skcanvas, setSkCanvas]: [SkCanvas | undefined, any] = useState();
  let [ctx, setCtx]: [CanvasRenderingContext2D | undefined, any] = useState();
  let [drawEventList]: Array<any> = useState([]);
  let [eventId, setEventId]: [number, any] = useState(100000);

  useImperativeHandle(ref, () => ({
    getContext: (type: string = '2d'): CanvasRenderingContext2D | undefined => {
      if (type === '2d') {
        return ctx;
      } else {
        console.log('not support ' + type);
      }
    },
    draw: (event: Function) => {
      drawEventList.push(event);
      setEventId(eventId + 1);
    },
    width: _style.width,
    height: _style.height,
  }));

  const onDraw = useDrawCallback(
    (canvas: SkCanvas) => {
      if (!skcanvas || !ctx) {
        const _skcanvas = MakeCanvas(canvas) as HTMLCanvas;
        const _ctx = _skcanvas.getContext('2d') as CanvasRenderingContext2D;
        setSkCanvas(_skcanvas);
        setCtx(_ctx);
      }
      drawEventList.map((event: any) => {
        event(ctx);
      });
    },
    [eventId, drawEventList],
  );

  return (
    <View style={_style}>
      <SkiaView ref={skiaRef} style={styles.skiaView} onDraw={onDraw} />
    </View>
  );
});

const styles = StyleSheet.create({
  skiaView: {
    flex: 1,
  },
});

export default Canvas;
