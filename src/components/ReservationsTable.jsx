import React, { useState } from "react";
import { Card, Icon, Text } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import ReservationBox from "./reservationBox";

/**
 * @param {{
 * editMode: boolean,
 * reservations: ProductReservation[],
 * heading:string,
 * initialExpanded?:boolean,
 * onRemoveItem?: (toDel: ProductReservation, index:number) => any,
 * }} props
 */
export default function ReservationTable({
    editMode,
    reservations,
    heading,
    initialExpanded = false,
    onRemoveItem = () => {}
}) {
    const [isExpanded, toggleExpand] = useState(initialExpanded);
    return (
        <>
            <TouchableOpacity
                style={styles.headingBox}
                onPress={() => toggleExpand((prev) => !prev)}
            >
                <Text h4> {heading} </Text>
                <Icon
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    type="feather"
                />
            </TouchableOpacity>
            <Card.Divider />
            {isExpanded && (
                <>
                    {reservations.map((rsv, index) => (
                        <ReservationBox
                            editMode={editMode}
                            onDelete={onRemoveItem}
                            index={index}
                            key={rsv.id}
                            reservation={rsv}
                        />
                    ))}
                    <Card.Divider />
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    headingBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 6,
    },
});
