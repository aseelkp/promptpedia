'use client';
import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'
import Profile from '@components/Profile';

const UserProfile = ({params}) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${params?.id}/posts`);
          const data = await res.json();
          setPosts(data);
        };
    
        fetchPosts();
      }, []);



  return (
    
    <Profile 
     name={userName.toUpperCase()}
     desc={`Welcome to ${userName}'s  profile`}
     data={posts}
    />
  )
}

export default UserProfile