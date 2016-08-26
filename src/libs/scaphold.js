import get from 'lodash/get';

export function login(profile) {
  const identity = get(profile, 'identities[0]');
  const token = localStorage.getItem('token');
  const data = {
    query: 'mutation Login($data:_LoginUserWithAuth0LockInput!) { loginUserWithAuth0Lock(input: $data) { id_token user { id username credentials } } } ',
    variables: JSON.stringify({ data: { identity, token }})
  };
  
  return new Promise((resolve, reject) => {
    if (!identity) reject('Cannot retrieve user identity');
    if (!token) reject('Cannot retrieve user token');
    console.log('fetch!');
  });
  
  // $.ajax({
  //   type: "POST",
  //   url: "http://localhost:3000/graphql/80400a55-07e3-445e-a8de-4bbc5f1a53de", // IMPORTANT: UPDATE THIS SCAPHOLD URL TO YOUR GRAPHQL API
  //   data: data,
  //   success: function(result) {
  //     console.log("That was easy!");
  //     console.log(result);
  //     return result;
  //   },
  //   error: function(xhr, ajaxOptions, error) {
  //     console.log("That didn't go so well.");
  //     console.log(error);
  //     return error;
  //   },
  //   dataType: 'json'
  // });
}