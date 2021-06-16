import React, { useEffect, useState } from 'react';
import { theme } from 'twin.macro';
import ButtonPrimary from '../Styled/ButtonPrimary';
import ButtonSecondary from '../Styled/ButtonSecondary';

export interface TourProps {
  onClose: () => void,
}

export default function Tour({
  onClose,
}: TourProps) {
  const steps = [
    {
      target: 'connection-url',
      copy: 'Enter the WebSocket URL here and then click connect.',
      position: 'bottom',
    },
    {
      target: 'connection-editor',
      copy: 'Once connected, use the editor to create a new message and sent it to the WebSocket server.',
      position: 'bottom',
    },
    {
      target: 'connection-list',
      copy: 'If you wish to have multiple clients talking to the WebSocket server create another connection.',
      position: 'bottom',
    },
    {
      target: 'saved-payloads',
      copy: 'Any payloads that are sent frequently can be saved here.',
      position: 'right',
    },
  ];

  const [step, setStep] = useState<number>(0);
  const [boundingBox, setBoundingBox] = useState<DOMRect | null>(null);
  const [lastCheckAt, setLastCheckAt] = useState<number>(Date.now());

  const padding1 = theme`padding.1`;
  const padding2 = theme`padding.2`;
  const padding4 = theme`padding.4`;

  useEffect(
    () => {
      const interval = window.setInterval(
        () => setLastCheckAt(Date.now()),
        1000,
      );

      return () => window.clearInterval(interval);
    },
    [],
  );

  useEffect(
    () => {
      const element = document.querySelector(`[data-tour='${steps[step].target}']`);

      if (!element) {
        onClose();
      }

      setBoundingBox(
        element!.getBoundingClientRect()!,
      );

      element!.scrollIntoView({ behavior: 'smooth' });
    },
    [step, lastCheckAt],
  );

  return (
    <>
      <div
        tw="absolute rounded-lg pointer-events-none ring-3000 ring-gray-700 dark:ring-gray-600 ring-opacity-50 dark:ring-opacity-75 shadow-lg"
        style={{
          left: `calc(${boundingBox?.left}px - ${padding1})`,
          top: `calc(${boundingBox?.top}px - ${padding1})`,
          width: `calc(${boundingBox?.width}px + ${padding2})`,
          height: `calc(${boundingBox?.height}px + ${padding2})`,
        }}
      />
      <div
        tw="absolute flex content-center"
        style={{
          left: steps[step].position === 'bottom'
            ? `calc(${boundingBox?.left}px - ${padding1})`
            : `calc(${boundingBox?.right}px + ${padding4})`,
          top: steps[step].position === 'bottom'
            ? `calc(${boundingBox?.bottom}px + ${padding4})`
            : `calc(${boundingBox?.top}px - ${padding1})`,
          width: `calc(${boundingBox?.width}px + ${padding2})`,
        }}
      >
        <div tw="bg-white dark:bg-gray-850 p-4 rounded-lg shadow-lg max-w-md">
          <p tw="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
            {`Step ${step + 1} of ${steps.length}`}
          </p>
          <p tw="mt-2 select-text text-gray-800 dark:text-gray-200">{steps[step].copy}</p>
          <div tw="flex justify-end mt-2">
            {(steps.length !== step + 1) && (
              <ButtonSecondary
                onClick={() => onClose()}
                tw="py-1 px-4 rounded mr-2"
              >
                Exit
              </ButtonSecondary>
            )}
            <ButtonPrimary
              onClick={() => {
                if (steps.length === step + 1) {
                  onClose();
                } else {
                  setStep(step + 1);
                }
              }}
              tw="py-1 px-4 rounded"
            >
              {
                steps.length === step + 1
                  ? 'Finish'
                  : 'Next'
              }
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
}
