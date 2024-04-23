import { useContext } from 'react';
import { SocialShareContext } from './SocialShareProvider';

export default function useSocialShareProvider() {
  return useContext(SocialShareContext);
}
