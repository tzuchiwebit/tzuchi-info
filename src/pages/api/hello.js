export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Handle GET request
      res.status(200).json({ message: 'Hello, World!' });
      break;
    case 'POST':
      // Handle POST request
      const body = req.body;
      res.status(200).json({ message: 'Hello, POST!', data: body });
      break;
    default:
      // Handle other methods or return a 405 (Method Not Allowed) status
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
