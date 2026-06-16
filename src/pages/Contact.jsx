
const Contact = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-4">Have questions or need support? Reach out to us!</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-300">Name</label>
          <input type="text" id="name" name="name" className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-300">Email</label>
          <input type="email" id="email" name="email" className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-300">Message</label>
          <textarea id="message" name="message" rows="5" className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
