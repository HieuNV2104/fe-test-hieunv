import { Spin } from 'antd';

export function PageFallback() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <Spin />
    </div>
  );
}
