export default function Skeleton({
    width = '100%',
    height = '20px',
    className = '',
  }: {
    width?: string;
    height?: string;
    className?: string;
  }) {
    return (
      <div
        className={`bg-gray-300 animate-pulse rounded ${className}`}
        style={{
          width: width,
          height: height,
          background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
          backgroundSize: '200% 100%',
        }}
      ></div>
    );
  }
  