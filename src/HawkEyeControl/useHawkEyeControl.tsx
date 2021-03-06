import { useEffect, useState } from 'react';
import { HawkEyeControlProps } from '.';
import { useVisiable } from '../common/hooks';

export interface UseHawkEyeControl extends HawkEyeControlProps {};

export function useHawkEyeControl(props = {} as UseHawkEyeControl) {
  const [hawkEyeControl, setHawkEyeControl] = useState<AMap.HawkEye>();
  const { map, offset, visiable, ...other } = props;
  useEffect(() => {
    if (map && !hawkEyeControl) {
      let instance: AMap.HawkEye;
      map.plugin(['AMap.HawkEye'], () => {
        instance = new AMap.HawkEye({ offset: offset, ...other });
        map.addControl(instance);
        setHawkEyeControl(instance);
      });

      return () => {
        if (instance && map && map.remove) {
          map.remove(instance);
        }
      }
    }
  }, [map]);

  useVisiable(hawkEyeControl! as any, visiable);
  return {
    hawkEyeControl, setHawkEyeControl,
  };
}