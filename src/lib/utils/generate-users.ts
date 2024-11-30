import type { StaticImageData } from "next/image"
import key0 from "@/app/assets/key(0).jpeg"
import key1 from "@/app/assets/key(1).jpeg"
import key2 from "@/app/assets/key(2).jpeg"
import key3 from "@/app/assets/key(3).jpeg"
import key4 from "@/app/assets/key(4).jpeg"
import key5 from "@/app/assets/key(5).jpeg"
import key6 from "@/app/assets/key(6).jpeg"
import key7 from "@/app/assets/key(7).jpeg"
import key8 from "@/app/assets/key(8).jpeg"
import key9 from "@/app/assets/key(9).jpeg"

interface Member {
    id: number;
    name: string;
    avatar: StaticImageData;
}

interface Moderator {
    id: number;
    name: string;
    avatar: StaticImageData;
    role: string;
}

const avatars = [key0, key1, key2, key3, key4, key5, key6, key7, key8, key9];

export const generateMembers = (count: number): Member[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        avatar: avatars[i % avatars.length],
    }));
};

export const generateModerators = (count: number): Moderator[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Moderator ${i + 1}`,
        avatar: avatars[i % avatars.length],
        role: i === 0 ? 'Admin' : 'Moderator',
    }));
};

