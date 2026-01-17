interface SectionDividerProps {
    variant?: 'wave' | 'curve' | 'slant';
    flip?: boolean;
    color?: string;
}

const SectionDivider = ({ variant = 'wave', flip = false, color = 'var(--bg-elevated)' }: SectionDividerProps) => {
    const getPath = () => {
        switch (variant) {
            case 'wave':
                return 'M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z';
            case 'curve':
                return 'M0,96L1440,0L1440,0L0,0Z';
            case 'slant':
                return 'M0,0L1440,96L1440,0L0,0Z';
            default:
                return 'M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z';
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                lineHeight: 0,
                transform: flip ? 'rotate(180deg)' : 'none'
            }}
        >
            <svg
                viewBox="0 0 1440 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            >
                <path d={getPath()} fill={color} />
            </svg>
        </div>
    );
};

export default SectionDivider;
