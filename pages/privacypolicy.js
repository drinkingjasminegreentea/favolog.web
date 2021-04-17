export default function Page() {
  return (
    <div className='mainContent'>
      <h3>Privacy Policy</h3>
      <p>Last updated: April 8, 2021</p>
      <p>
        This privacy policy describes our policies and procedures on the
        collection, use and disclosure of your information when you use the
        service and tells you about your privacy rights and how the law protects
        you.
      </p>
      <h5> Sign up and log in to the service </h5>
      <p>
        We use trusted, industry standard authentication provider to allow you
        to sign up and login to the app. You can register using your email
        address and password, or use an existing social login from major
        platforms such as Facebook, Twitter or Google. In case of using an email
        and password, your password is securely saved using Google's Firebase
        authentication technology. In case of using social platform login, we
        receive a code that's unique to your profile and our application from
        the 3rd party platform such as Facebook or Twitter and use it to
        authenticate you to our app.
      </p>

      <h5>Private data</h5>
      <p>
        Currently the only piece of private data we store is your email address.
        It's used for password recovery in case of email and password sign up
        and for sending email notifications with any updates in your profile. We
        take full responsibility for keeping your private data secure.
      </p>
      <h5>Public data</h5>
      <p>
        Any data visible to people other than youself is considered public.
        Username, first and last name, catalogs and favorite items fall into
        this category. You have full control over which public data to enter and
        allowed to update it or delete it at anytime. We will be adding a
        private profile and catalogs feature soon, in that case your data will
        be only visible to the people you approve.
      </p>
    </div>
  )
}
