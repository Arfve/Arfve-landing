


interface AboutHero3Props {
  title: string;
}

export default function AboutHero3({ title }: AboutHero3Props) {
  console.log('AboutHero3 Data:', title);
  
  return (
    <div>
      <h1>About Hero 3</h1>
      <p>
        {title || 'No data available'}
      </p>
    </div>
  );
}
