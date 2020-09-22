import { useState, useMemo } from 'react';
import { MapProps } from './';
import { MapChildProps } from '../common/map';
import { useSetStatus, useEventProperties } from '../common/hooks';

export interface UseMap extends MapProps, MapChildProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement | null;
}

export default (props: UseMap = {}) => {
  const { ...other } = props;
  const [map, setMap] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState(props.container);
  useMemo(() => {
    if (container && !map && AMap) {
      const instance = new AMap.Map(container, { zoom, ...other });
      setMap(instance);
    }
  }, [container, map]);

  useMemo(() => {
    if (map && typeof props.zoom === 'number' && zoom !== props.zoom && props.zoom >= 2 && props.zoom <= 20) {
      setZoom(props.zoom);
      map.setZoom(props.zoom);
    }
  }, [zoom, props.zoom]);

  useSetStatus<AMap.Map, UseMap>(map!, props, ['dragEnable', 'zoomEnable', 'jogEnable', 'pitchEnable', 'rotateEnable', 'animateEnable', 'keyboardEnable']);
  useEventProperties<AMap.Map, UseMap>(map!, props, [
    'onMouseMove', 'onZoomChange', 'onMapMove', 'onMouseWheel', 'onZoomStart', 'onMouseOver', 'onMouseOut', 'onDblClick', 'onClick', 'onZoomEnd', 'onMoveEnd', 'onMouseUp', 'onMouseDown', 'onRightClick', 'onMoveStart', 'onDragStart', 'onDragging', 'onDragEnd', 'onHotspotOut', 'onHotspotOver', 'onTouchStart', 'onComplete', 'onHotspotClick', 'onTouchMove', 'onTouchEnd', 'onResize',
  ]);
  return {
    map, setMap,
    container, setContainer,
  };
}