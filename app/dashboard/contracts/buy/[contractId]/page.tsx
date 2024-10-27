import PageContainer from '@/components/layout/page-container';

const todos = [
  'Keep track of your notes in your account',
  'Buy Notes',
  'Sell Notes',
  'Go Back Home'
];

interface ContractPageProps {
  params: { contractId: string };
}

export default async function page({ params }: ContractPageProps) {
  const { contractId } = params;
  const price = '$57.00';
  const notes = 1;
  return (
    <PageContainer>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Order Submitted</h1>
        <p>
          We have received your order to buy{' '}
          <span className="font-bold">
            {notes} Note (ID: {contractId})
          </span>{' '}
          for a total purchase price of{' '}
          <span className="font-bold">{price}</span>. Your order will settle
          today if we received your order before 5PM Eastern Standard Time on a
          business day. Otherwise, your order will settle on the next business
          day.
        </p>

        <div className="text-xl font-semibold">You can now:</div>
        <ul className="list-disc text-blue-500">
          {todos.map((item, key) => (
            <li className="cursor-pointer hover:underline" key={key}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}
