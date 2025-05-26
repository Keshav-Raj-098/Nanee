import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../(tabs)/index'
import logo from "@/assets/images/Nanee_logo.png";
import success from "@/assets/images/success.svg";
import shield from "@/assets/images/shield.png";
import lock from "@/assets/images/lock.png";
import globe from "@/assets/images/globe.png";

type CardProps = {
    title: string;
    description: string;
    imageSrc: any;
}

function Card({ title, description, imageSrc }: CardProps) {

    return (

        <View style={{ padding: 20, backgroundColor: "#090c14", borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center", gap: 10 }}>

            <Image source={imageSrc} style={{ width: 30, height: 30, }} />

            <Text style={{ color: "white", alignSelf: "center", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>{title}</Text>

            <Text style={{ color: "#9ca3af", fontSize: 13, textAlign: "center" }}>{description}</Text>

        </View>
    )
}
export default function AboutUs() {
    const cardData = [
        {
            title: '100% Anonymous',
            description: 'No accounts, no phone numbers',
            imageSrc: success,
        },
        {
            title: '0% Data Collection',
            description: 'No logs, no tracking',
            imageSrc: shield,
        },
        {
            title: 'Secret Coded Messages',
            description: 'Your messages stay private, so no one can check.',
            imageSrc: lock,
        },
        {
            title: 'Complete Control',
            description: 'Delete all messages from everywhere with one click.',
            imageSrc: globe,
        },
    ];

    const renderHeader = () => (
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image source={logo} style={{ width: 100, height: 100, }} />
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>nanee</Text>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#32d6ef", lineHeight: 30, marginVertical: 15, textAlign: "center" }}>
                Private, Secure,{"\n"}Untraceable Messaging.
            </Text>
            <Text style={{ color: "#9ca3af", fontSize: 18, textAlign: "center" }}>No compromises, No risk.</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, maxWidth: 500 }}>
            <FlatList
                data={cardData}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: '48%', margin: '1%' }}>
                        <Card
                            title={item.title}
                            description={item.description}
                            imageSrc={item.imageSrc}
                        />
                    </View>
                )}
                contentContainerStyle={{ alignItems: 'center' }}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
